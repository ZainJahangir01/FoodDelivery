const expres = require('express');
const router = expres.Router();

router.post('/foodData', (req, res) => {
    try {
        // console.log(global.food_items);
        // console.log(global.food_category);
        res.send([global.food_category, global.food_items]);
    } catch (error) {
        console.error(error);
        res.send("Server error");
    }
})
module.exports = router;
