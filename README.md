WARNING: This project is outdated and not maintained anymore.

### Install
Add packages to your project by using command

#### Meteor v0.9.0
###
    meteor add particle4dev:debugx
###

### Quick start

    DEBUGX.allow('*');
    DEBUGX.deny('*');
    DEBUGX.allow(function(group){
        return group === 'print';
    });
    DEBUGX.deny(function(group){
      return group === 'hidden';
    });
    DEBUGX.format('{{time}} >> {{group}} >> {{message}}');
    DEBUGX.error('print', 'message');
    DEBUGX.warn('print', 'message');
    DEBUGX.info('print', 'message');
    DEBUGX.log('print', 'message red'.color('red') + 'message red'.color('green'));

### API

### Color Rules

* Error : Red
* Info : white
* Warn : yellow
* Trace: cyan

### Todo

* write logs file
