import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import InspectorTabs from '../../../components/inspector-tabs';
import AdvancedTab from '../../../components/advanced-tab';
import usePreviewContext, { getEmbeddedAuthorName } from '../../shared/use-preview-context';

const DISPLAY_FORMAT_OPTIONS = [
	{ label: __( 'Display Name', 'blockive-premium-addon-for-block' ), value: 'display_name' },
	{ label: __( 'First Name', 'blockive-premium-addon-for-block' ), value: 'first_name' },
	{ label: __( 'Last Name', 'blockive-premium-addon-for-block' ), value: 'last_name' },
	{ label: __( 'Nickname', 'blockive-premium-addon-for-block' ), value: 'nickname' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { displayFormat, isLink, linkTarget, textAlign } = attributes;

	const { record, isResolving } = usePreviewContext();
	const previewName = getEmbeddedAuthorName( record );

	const blockProps = useBlockProps( {
		className: 'bpafb-tb-author',
		style: { textAlign: textAlign || undefined },
	} );

	return (
		<>
			<BlockControls>
				<AlignmentControl
					value={ textAlign }
					onChange={ ( value ) => setAttributes( { textAlign: value } ) }
				/>
			</BlockControls>

			<InspectorControls>
				<InspectorTabs
					general={
						<PanelBody title={ __( 'Settings', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<SelectControl
								label={ __( 'Display Format', 'blockive-premium-addon-for-block' ) }
								value={ displayFormat }
								options={ DISPLAY_FORMAT_OPTIONS }
								onChange={ ( value ) => setAttributes( { displayFormat: value } ) }
							/>
							<ToggleControl
								label={ __( 'Link to Author Archive', 'blockive-premium-addon-for-block' ) }
								checked={ !! isLink }
								onChange={ ( value ) => setAttributes( { isLink: value } ) }
							/>
							{ isLink && (
								<ToggleControl
									label={ __( 'Open in New Tab', 'blockive-premium-addon-for-block' ) }
									checked={ linkTarget === '_blank' }
									onChange={ ( value ) => setAttributes( { linkTarget: value ? '_blank' : '_self' } ) }
								/>
							) }
						</PanelBody>
					}
					style={
						<PanelBody title={ __( 'Style', 'blockive-premium-addon-for-block' ) } initialOpen={ true }>
							<p className="bpafb-help-text">
								{ __( 'Font, size, weight, color and other typography options are available in the native Styles panel above.', 'blockive-premium-addon-for-block' ) }
							</p>
						</PanelBody>
					}
					advanced={ <AdvancedTab attributes={ attributes } setAttributes={ setAttributes } /> }
				/>
			</InspectorControls>

			<span { ...blockProps }>
				{ isResolving && ! previewName
					? __( 'Loading…', 'blockive-premium-addon-for-block' )
					: previewName || __( 'Jane Doe', 'blockive-premium-addon-for-block' ) }
			</span>
		</>
	);
}
