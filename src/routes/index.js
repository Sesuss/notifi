const { Router } = require("express");
const router = Router();

const webpush = require("../webpush");
let pushSubscripton;
const aaa = {
  endpoint: "https://fcm.googleapis.com/fcm/send/f--2iP_vjj4:APA91bFC_xj66to7wpKkYUipA7YCYsYYIH-cYxRNiYidtBW-O_sfbDVz4fgjYq2Tmnn21c13lhkDrAYdOVv82WEhyCNY7Qk3oU9whUyVy37-PVqWVeCbsFRjrplN5PqpIUkYtRHT6Ooh",
  expirationTime:null,
  keys:{
    p256dh:'BBPowO7UjgRV0oYwcInZJjahcqghobZzrY18RuSV1ry_ecNrd0NSy1Pv3y_Ilby3dJNphomOVl_pBva6luXTUlc',
    auth:'XVxGJzqhzuG-D46GXDoNLg'
  }
}

router.post("/subscription", async (req, res) => {
  pushSubscripton = req.body;
  // Server's Response
  res.status(201).json();
});


router.get("/new:id/:pas", async (req, res) => {
  const  {id,pas}  = req.params;

  if (pas==55765412) {
   const payload = JSON.stringify({
    title: 'Se registró un nuevo servicio',
    message:'El folio de la orden de servicio es '+id 
  });



  try {
    await webpush.sendNotification(aaa, payload);
  } catch (error) {
    console.log(error);
  }

  }

  res.redirect('http://zonadigitalweb.com:4000/serviflash/servicios_pendientes')


});




router.post("/new-message", async (req, res) => {
  const { message } = req.body;
  // Payload Notification
  const payload = JSON.stringify({
    title: "My Custom Notification",
    message 
  });

  console.log(aaa)
  res.status(200).json();
  try {
    await webpush.sendNotification(pushSubscripton, payload);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
