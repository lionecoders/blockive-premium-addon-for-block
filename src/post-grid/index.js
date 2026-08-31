import { registerBlockType } from '@wordpress/blocks';
import './style-index.css';
import Edit from './edit';
import metadata from './block.json';

registerBlockType(metadata.name, {
	...metadata,
	edit: Edit,
	save: () => null,
});
