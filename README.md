# WVU Pattern Library Starter Kit

[![Build Status](https://travis-ci.org/wvu-patterns/wvu-patterns-starter-kit.svg?branch=master)](https://travis-ci.org/wvu-patterns/wvu-patterns-starter-kit)

Use [Bower](http://bower.io/) to install this module.

```bash
$ bower install --save wvu-patterns-starter-kit
```

The wvu-patterns-starter-kit ties together the main patterns used in a base line WVU design.

##Supported 3rd Party Utilities
* Normalize - https://github.com/appleboy/normalize.scss
* Clearfix - https://github.com/inuitcss/trumps.clearfix

##Supported Utilities
* Box Sizing - https://github.com/wvu-patterns/wvu-utilities-box-sizing

##Supported Patterns
* WVU Masthead - https://github.com/wvu-patterns/wvu-patterns-masthead
* WVU Footer - https://github.com/wvu-patterns/wvu-patterns-footer

##Upcoming Patterns & Utilities
A list of default utilities/packages that will be added to wvu-patterns-starter-kit.

* _wvu-typography.scss - based on modular scale / gridlover
* _wvu-responsive-images.scss - allows all images to scale 100% to parent container
* _wvu-helpers.scss - helper classes from HTML5 Boilerplate
* _wvu-colors.scss - a list of variables for the WVU color pallette
* _wvu-responsive-video.scss - Adam has the embed code
* _variables.scss - any other global variables that we may need... (not sure we need this yet, open for debate).

__REMINDER:__ Make sure to use !Default for styles that can or should be modified by the user.


###Pattern Development

Requires:

* Ruby 1.9.3-p484
* NodeJS
* Gulp

*RVM is Preferred* but not required

####Installation

* `cd {install-dir}/wvu-patterns-footer-links`
* `gem install bundler`
* `bundle install`
* `npm install`

####Pattern Testing

* `gulp test` will create a build directory so you can view pattern
* `gulp ci` will run lint test to make sure .scss file is valid
