import express from 'express';
import dayjs from 'dayjs';

const router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

const defaultHTML = () => `
<h1>Main</h1>
<ul>
  <li>POD_NAME: ${process.env.POD_NAME || 'localhost'}</li>
  <li>TIMEZONE: ${process.env.TZ}</li>
  <li>DATETIME: ${dayjs().format()}</li>
</ul>`;

// define the home page route
router.get('/', function (req, res) {
    // res.send('Hello world')
    // res.sendFile(__dirname + '/public/index.html');

    res.send(defaultHTML());
});

// router.get('/test', function (req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

// router.get('/temp/:folder/:file', function (req, res) {
//     res.sendFile(`${process.cwd()}/.temp/${req.params.folder}/${req.params.file}`);
// });

// router.get('/uploads/:id/:file', function (req, res) {
//     res.sendFile(`${process.env.DYNAMIC_FILES_DIR}/uploads/${req.params.id}/${req.params.file}`);
// });

// router.get('/dynamic/:project/:id/:file', function (req, res) {
//     res.sendFile(
//         `${process.env.DYNAMIC_FOLDER}/${req.params.project}/uploads/${req.params.id}/${req.params.file}`
//     );
// });

// router.post('/api/v1/printing/export-image/create', async (req, res) => {
//     try {
//         const result = await createCanvasByJson(req.body);

//         if (result.status) {
//             return res.status(200).json(result);
//         } else {
//             return res.status(400).json(result);
//         }
//     } catch (error) {
//         console.error(`api/v1/printing/export-image/create error`, error);
//     }

//     return res.status(500);
// });

// router.post('/api/v1/upload/image', async (req, res) => {
//     try {
//         const result = await uploadImage(req);

//         if (result.status) {
//             return res.status(200).json(result);
//         } else {
//             return res.status(400).json(result);
//         }
//     } catch (error) {
//         console.error(`api/v1/upload/image error`, error);
//     }

//     return res.status(500);
// });

// // io.on('connection', onConnection);

export default router;
