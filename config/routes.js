var router = require("express").Router();

router.get("/", function(req, res){
    res.render("index", { authenticated: req.isAuthenticated() });
});
router.get("/auth/google/callback", passport.authenticate( 'google', { 
        successRedirect: '/index',
        failureRedirect: '/index'
}));

router.get("/login", passport.authenticate("google", {
        scope: "https://www.googleapis.com/auth/calendar"
}) );

module.exports = router;
