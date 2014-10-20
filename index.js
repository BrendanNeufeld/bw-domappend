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

					var dummy = document.createElement( 'div' );
					dummy.innerHTML = data;
					
					for( var i = 0, len = dummy.childNodes.length; i < len; i++ ) {

						parentEl.appendChild( dummy.childNodes[ i ] );
					}
				} else {

					parentEl.appendChild( data );	
				}
				
				
				onOk( parentEl );
			}
		});
	};
};