const dotenv = require('dotenv');

(function () {
	dotenv.config({path: '.env.local'});
	dotenv.config({path: '.env'});
})();
