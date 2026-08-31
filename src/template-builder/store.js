import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
	previewMode: false,
	context: {},
	variables: {},
};

const actions = {
	setPreviewMode( previewMode ) {
		return { type: 'SET_PREVIEW_MODE', previewMode };
	},
	setContext( context ) {
		return { type: 'SET_CONTEXT', context };
	},
	setVariable( name, value ) {
		return { type: 'SET_VARIABLE', name, value };
	},
};

const selectors = {
	isPreviewMode( state ) {
		return state.previewMode;
	},
	getContext( state ) {
		return state.context;
	},
	getVariables( state ) {
		return state.variables;
	},
	getVariable( state, name ) {
		return state.variables[ name ];
	},
};

function reducer( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'SET_PREVIEW_MODE':
			return { ...state, previewMode: action.previewMode };
		case 'SET_CONTEXT':
			return { ...state, context: action.context };
		case 'SET_VARIABLE':
			return {
				...state,
				variables: { ...state.variables, [ action.name ]: action.value },
			};
		default:
			return state;
	}
}

// Central store for Template Context / Template Variables / Template Preview
// state. UI features (Template Preview toggle, variable pickers, dynamic
// content bindings) should read/write through this store rather than local
// component state, so they stay in sync across panels and blocks.
export const TEMPLATE_EDITOR_STORE = 'blockive/template-editor';

export function registerTemplateEditorStore() {
	register(
		createReduxStore( TEMPLATE_EDITOR_STORE, {
			reducer,
			actions,
			selectors,
		} )
	);
}
