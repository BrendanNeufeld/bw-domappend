var promise = require( 'promise' ),
	select = require( 'select-dom' );

module.exports = function( domSelector ) {

	var parentEl = select( domSelector || 'body' );

	return function( data ) {

		return new promise( function( onOk, onErr ) {

			if( !parentEl ) {

				onErr( new Error( 'No html element to write into' ) );	
			} else {

				if( typeof data == 'string' ) {

					parentEl.innerHTML = parentEl.innerHTML + data;
				} else {

					parentEl.appendChild( data );	
				}
				
				
				onOk( parentEl );
			}
		});
	};
};