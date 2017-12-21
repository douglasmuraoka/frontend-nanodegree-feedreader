/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have feeds with url defined and not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined(); // checks if url is defined
                expect(typeof allFeeds[i].url).toBe("string"); // checks if url is a string
                expect(allFeeds[i].url.trim().length).not.toBe(0); // checks if url is not blank
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have feeds with name defined and not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined(); // checks if name is defined
                expect(typeof allFeeds[i].name).toBe("string"); // checks if name is a string
                expect(allFeeds[i].name.trim().length).not.toBe(0); // checks if name is not blank
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true); // checks if the class that makes it hidden is applied
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles when clicked', function() {
            $('.menu-icon-link').click(); // triggers click event, which makes it visible
            expect($('body').hasClass('menu-hidden')).toBe(false); // checks if the class that makes it hidden is not applied

            $('.menu-icon-link').click(); // triggers click event, which makes it hidden again
            expect($('body').hasClass('menu-hidden')).toBe(true); // checks if the class that makes it hidden is applied
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done(); // after loading the feed, invokes done from Jasmine
            });
        });

        it('should load feed asynchronously', function(done) {
            expect($('.header-title').text()).toBe(allFeeds[0].name); // checks if the title has changed correctly
            expect($('.entry').length).not.toBe(0); // checks if our list has loaded entries
            done();
        });
    });

    /* Checks if application is not broken, even if the user invokes our methods with wrong arguments */
    describe('Error Handling', function() {
        beforeEach(function(done) {
            loadFeed(-999, function() { // try to load some undefined feed
                done();
            });
        });

        it('should not result in error due to undefined variable', function(done) {
            expect($('.header-title').text()).toBe(allFeeds[0].name); // checks if the title has not changed (ignored my loadFeed call)
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            /**
             * Callback for when loadFeed(1) is done. Calls done to verify expectations
             */
            function callDone() {
                done();
            }
            // Loads feed with id 0, and when it is done, loads feed with id 1
            loadFeed(0, function(done) {
                loadFeed(1, callDone);
            });
        });
        // After loading feeds with id 0, and then 1, checks if the actual content is
        // from feed with id 1.
        it('should load new feed asynchronously', function(done) {
            expect($('.header-title').text()).toBe(allFeeds[1].name); // checks if the title has changed correctly
            expect($('.entry').length).not.toBe(0); // checks if our list has loaded entries
            done(); 
        });
    });
}());
