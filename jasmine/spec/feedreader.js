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


        /* Loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have feeds with url defined and not empty', function() {
            for(var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined(); // checks if url is defined
                expect(typeof allFeeds[i].url).toBe("string"); // checks if url is a string
                expect(allFeeds[i].url.trim().length).not.toBe(0); // checks if url is not blank
            }
        });

        /* Loops through each feed in the allFeeds object and ensures it has a name defined
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

    describe('The Menu', function() {
        /* Ensures the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true); // checks if the class that makes it hidden is applied
        });

        /* Ensures the menu changes visibility when the menu icon is clicked.
         * Ensures that the menu shows when clicked and hides when clicked again.
         */
        it('toggles when clicked', function() {
            $('.menu-icon-link').click(); // triggers click event, which makes it visible
            expect($('body').hasClass('menu-hidden')).toBe(false); // checks if the class that makes it hidden is not applied

            $('.menu-icon-link').click(); // triggers click event, which makes it hidden again
            expect($('body').hasClass('menu-hidden')).toBe(true); // checks if the class that makes it hidden is applied
        });
    });

    describe('Initial Entries', function() {
        /* Ensures when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done(); // after loading the feed, invokes done from Jasmine
            });
        });

        it('should load feed asynchronously', function() {
            expect($('.header-title').text()).toBe(allFeeds[0].name); // checks if the title has changed correctly
            expect($('.feed .entry').length).not.toBe(0); // checks if our list has loaded entries
        });
    });

    /* Checks if application is not broken, even if the user invokes our methods with wrong arguments */
    describe('Error Handling', function() {
        beforeEach(function() {
            loadFeed(0, function() {
                loadFeed(-999);
            });

        });

        it('should not result in error due to undefined variable', function() {
            expect($('.header-title').text()).toBe(allFeeds[0].name); // checks if the title has not changed (ignored my loadFeed call)
        });
    });

    describe('New Feed Selection', function() {
        /* Ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            // Loads feed with id 0, and when it is done, loads feed with id 1
            loadFeed(0, function(done) {
                done();
            });
        });
        // After loading feeds with id 0, and then 1, checks if the actual content is equal initial content
        it('should load new feed asynchronously', function(done) {
            var initialFeed = $('.feed').html();

            loadFeed(1, function(done) {
                expect($('.feed').html()).not.toBe(initialFeed);
                done();
            });
        });
    });
}());
