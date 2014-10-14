var promise = require( 'promise' ),
	select = require( 'select-dom' );

module.exports = function( domSelector ) {

	var parentEl = select( domSelector || 'body' );

	return function( element ) {

		return new promise( function( onOk, onErr ) {

			if( !parentEl ) {

				onErr( new Error( 'No html element to write into' ) );	
			} else {

				parentEl.appendChild( element );
				
				onOk( element );
			}
		});
	};
};