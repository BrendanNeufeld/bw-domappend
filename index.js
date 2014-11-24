var promise = require( 'promise' ),
	select = require( 'select-dom' );

module.exports = function( data ) {

	if( !data )
		data = {};

	return new promise( function( onOk, onErr ) {

		if( data.dataDOM ) {

			if( !data.parentDOM )
				data.parentDOM = document.body;
			else if( data.parentDOM ) {

				if( typeof data.parentDOM == 'string' )
					var parentDOM = select( data.parentDOM );

				if(!parentDOM){

					console.warn('parentDOM does not exist, so document.body will be used instead');

					parentDOM = document.createElement('div');
					parentDOM.setAttribute("id", data.parentDOM.replace('#',''));
					document.body.appendChild(parentDOM);
				}

				data.parentDOM = parentDOM;


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