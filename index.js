var promise = require( 'promise' ),
	select = require( 'select-dom' );

module.exports = function( parentEl ) {

	return function( data ) {

		if( !data )
			data = {};

		return new promise( function( onOk, onErr ) {

			if( data.dataDOM ) {

				if( !data.parentDOM && !parentEl )
					data.parentDOM = document.body;
				else if( data.parentDOM ) {

					if( typeof data.parentDOM == 'string' )
						data.parentDOM = select( data.parentDOM );
				} else if( parentEl ) {

					if( typeof parentEl == 'string' )
						data.parentDOM = select( parentEl );
					else
						data.parentDOM = parentEl;
				}
					
				if( typeof data.dataDOM == 'string' ) {

					var dummy = document.createElement( 'div' );
					dummy.innerHTML = data.dataDOM;
					
					for( var i = 0, len = dummy.childNodes.length; i < len; i++ ) {

						data.parentDOM.appendChild( dummy.childNodes[ i ] );
					}
				} else {

					data.parentDOM.appendChild( data.dataDOM );	
				}
				
				onOk( data );
			} else {

				onErr( new Error( 'nothing to add to dom. dataDOM not defined in data being passed' ) ); 
			}
		});
	};
};