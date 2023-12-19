const express = require("express");
const faqController = require("../controllers/faqController");
const router = express.Router();


router.post("/addQuestion",faqController.addQuestion);
router.get("/getQuestion/:faq_id",faqController.getQuestion);
router.put("/deleteQuestion/:faq_id",faqController.deleteQuestion);
router.put("/restoreQuestion/:faq_id",faqController.restoreQuestion);
router.get("/getAllQuestion",faqController.getAllQuestion);
router.put("/UpdateQuestion/:faq_id",faqController.UpdateQuestion);


module.exports = router
