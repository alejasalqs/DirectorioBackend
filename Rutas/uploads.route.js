/*

  Ruta: /api/uploads

*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload,retornaImg } = require('../Controladores/uploads.controller');
const { v4: uuidv4 } = require('uuid');

const router = Router();

router.use(expressFileUpload());

router.get('/:tipo/:foto', async (req,res) => {
    
    const { tipo, foto} = req.params;
    
    const img = await retornaImg(tipo,foto);

    return res.sendFile(img);
})

router.put('/:tipo/:id', async (req, res) => {
    try {
        const { tipo, id } = req.params;

        console.log('\x1b[36m%s\x1b[0m',`PUT /api/${tipo}/'${id}`)
        
        const tiposValidos = ['doctor'];

        if(!tiposValidos.includes(tipo)){
            return res.status(400).json({
                ok: false,
                mensaje: 'No es un tipo válido'
            })
        }

        // Validar que haya un archivo
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Debe seleccionar un archivo'
            })
        }

        file = req.files.imagen;

        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        //validar extension
        const extensionesValidas = ['jpg','jpeg','png','gif'];

        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok: false,
                mensaje: 'No es una extensión válida'
            })
        }

        //Generar nombre de archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

        //Guardar imagen
        const path = `./Uploads/${tipo}/${nombreArchivo}`;

        file.mv(path, async (err) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error guardando la imagen'
                })
            }

            const data = await fileUpload(tipo,id,nombreArchivo);

            return res.json({
                ok: true,
                mensaje: 'Archivo subido correctamente',
                nombreArchivo
            })
        })
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;