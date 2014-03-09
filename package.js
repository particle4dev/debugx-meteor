Package.describe({
    summary: "debugx for meteor"
});

// meteor test-packages ./
Npm.depends({
	"cli-color": "0.2.3"
});

Package.on_use(function (api) {
	api.use('underscore', ['client', 'server']);
	api.add_files([
		'debugx.js',
		'export.js'
	], ['client', 'server']);
  	if (typeof api.export !== 'undefined') {
    	api.export('DEBUGX', ['server', 'client']);
  	}
});