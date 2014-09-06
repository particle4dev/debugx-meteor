Package.describe({
    summary: "debugx for meteor",
    version: "1.0.1",
    name: "particle4dev:debugx",
    git: "https://github.com/particle4dev/debugx-meteor.git"
});

// meteor test-packages ./
Npm.depends({
    "cli-color": "0.3.2"
});

Package.on_use(function(api) {
    api.versionsFrom("METEOR@0.9.0");
    api.use('underscore', ['client', 'server']);
    api.add_files([
        'boot.js',
        'debugx.js'
    ], ['client', 'server']);
    if (typeof api.export !== 'undefined') {
        api.export('DEBUGX', ['server', 'client']);
    }
});
