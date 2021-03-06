module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //vendors 
    var vendors = require('../app/controllers/vendors');
    app.get('/vendors', vendors.all);
    app.post('/vendors', auth.requiresLogin, vendors.create);
    app.get('/vendors/:vendorId', vendors.show);
    app.put('/vendors/:vendorId', auth.requiresLogin, auth.vendor.hasAuthorization, vendors.update);
    app.del('/vendors/:vendorId', auth.requiresLogin, auth.vendor.hasAuthorization, vendors.destroy);

    //categories 
    var categories = require('../app/controllers/categories');
    app.get('/categories', categories.all);
    app.post('/categories', auth.requiresLogin, categories.create);
    app.get('/categories/:categoryId', categories.show);
    app.put('/categories/:categoryId', auth.requiresLogin, auth.category.hasAuthorization, categories.update);
    app.del('/categories/:categoryId', auth.requiresLogin, auth.category.hasAuthorization, categories.destroy);

    //items 
    var items = require('../app/controllers/items');
    app.get('/items', items.all);
    app.post('/items', auth.requiresLogin, items.create);
    app.get('/items/:itemId', items.show);
    app.put('/items/:itemId', auth.requiresLogin, auth.item.hasAuthorization, items.update);
    app.del('/items/:itemId', auth.requiresLogin, auth.item.hasAuthorization, items.destroy);

    //categories 
    var units = require('../app/controllers/units');
    app.get('/units', units.all);
    app.post('/units', auth.requiresLogin, units.create);
    app.get('/units/:unitId', units.show);
    app.put('/units/:unitId', auth.requiresLogin, auth.unit.hasAuthorization, units.update);
    app.del('/units/:unitId', auth.requiresLogin, auth.unit.hasAuthorization, units.destroy);

    //upload file
    var upload = require('../app/controllers/upload');
    app.post("/uploads", upload.onUpload);
    app.delete("/uploads/:uuid", upload.onDeleteFile);
    
    //Finish with setting up the articleId param
    app.param('articleId', articles.article);
    app.param('vendorId', vendors.vendor);
    app.param('categoryId', categories.category);
    app.param('itemId', items.item);
    app.param('unitId', units.unit);
    
    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
