var express = require('express');
var router = express.Router(); //express router to use the routing
var Contact = require('../models/contact.model');
var News = require('../models/news.model');

module.exports = router; //exporting router

// Get contacts from certain division and certain type
router.get('/', async (req, res) => {

  try {
    var contact = new Contact({
      name: "Yangon Pyi Thu Say Yone Gyi",
      phoneNumber: "01256123",
      location: "-",
      stateDivision: "YGN",
      contactType: "hospital",
    })
    try {
      await contact.save()
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }

    var contact = new Contact({
      name: "Mandalay Kalay Say Yone Gyi",
      phoneNumber: "02345068",
      location: "-",
      stateDivision: "MDY",
      contactType: "hospital",
    })
    try {
      await contact.save()
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }

    var contact = new Contact({
      name: "Nar Yay Ku Nyi Mhu",
      phoneNumber: "01256123",
      location: "-",
      stateDivision: "YGN",
      contactType: "social services",
    })
    try {
      await contact.save()
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
    var contact = new Contact({
      name: "Mandalay Volunteers",
      phoneNumber: "01256123",
      location: "-",
      stateDivision: "MDY",
      contactType: "social services",
    })
    try {
      await contact.save()
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
    res.json({
      message: "Dummy Contacts Created"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})


router.get('/news', async (req, res, next) => {
  try {
    var news = new News({
      ID: null,
      source: "Eleven News",
      title: "ကိုရိုနာဗိုင်းရပ်စ်ရောဂါ သံသယလက္ခဏာများတွေ့ရှိသဖြင့် ရွှေဘိုခရိုင် ဝက်လက်မြို့နယ်ရှိ အမျိုးသားကို ကုသပေးခဲ့သည့် မန္တလေးဆေးရုံကြီး အရေးပေါ်ဌာနမှ ဆရာဝန်ကို ကန်တော်နဒီ ဆေးရုံသို့ပို့ဆောင် စောင့်ကြည့်",
      url: "https://news-eleven.com/article/163161",
      date: "2020-03-08",
      uploadBy: "api"
    });
    try {
      await news.save();
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }

    var news = new News({
      ID: null,
      source: "Facebook Group",
      title: "ဒီ Group ရဲ့ ရည်ရွယ်ချက်က သတင်းတု၊ သတင်းမှား၊ ကောလာဟလတွေကို လူထုအင်အား သုံးပြီး အချက်အလက် ကောက်ယူဖို့၊ တန်ပြန်နှိမ်နှင်းဖို့၊ အချက်အလက် စိစစ်ဖို့ ဖြစ်သလို သက်ဆိုင်ရာ တာဝန်ရှိသူတွေနဲ့ လက်တွဲပြီး သတင်းတု၊ သတင်းမှား၊ ကောလာဟလ တားဆီးနှိမ်နှင်းရေးကို အထောက်အကူ ပြုဖို့လည်း ပါဝင်ပါတယ်။",
      url: "https://www.facebook.com/groups/198360681431931",
      date: "2020-03-14",
      uploadBy: "test@gmail.com"
    });
    try {
      await news.save();
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }

    res.json({
      message: "Dummy News Created"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})