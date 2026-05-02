import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	RangeControl,
	ColorPalette,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { members, columns, textColor, bgColor } = attributes;

	const customStyles = {
		'--lcibwc-team-text-color': textColor,
		'--lcibwc-team-bg-color': bgColor,
		'--lcibwc-team-columns': columns,
	};

	const blockProps = useBlockProps({
		className: 'lcibwc-team-wrapper',
		style: customStyles,
	});

	const updateMember = (index, key, value) => {
		const newMembers = [...members];
		newMembers[index] = { ...newMembers[index], [key]: value };
		setAttributes({ members: newMembers });
	};

	const addMember = () => {
		setAttributes({
			members: [
				...members,
				{
					id: Date.now().toString(),
					name: `Team Member #${members.length + 1}`,
					role: 'Position',
					image: '',
					bio: 'Member bio goes here...',
					socialLinks: [],
				},
			],
		});
	};

	const removeMember = (index) => {
		const newMembers = members.filter((_, i) => i !== index);
		setAttributes({ members: newMembers });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Team Members', 'lc-immeasurable-block-widgets-collection')} initialOpen={true}>
					{members.map((member, index) => (
						<div key={member.id} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px' }}>
							<TextControl
								label={__('Name', 'lc-immeasurable-block-widgets-collection')}
								value={member.name}
								onChange={(val) => updateMember(index, 'name', val)}
							/>
							<TextControl
								label={__('Role', 'lc-immeasurable-block-widgets-collection')}
								value={member.role}
								onChange={(val) => updateMember(index, 'role', val)}
							/>
							<TextControl
								label={__('Bio', 'lc-immeasurable-block-widgets-collection')}
								value={member.bio}
								onChange={(val) => updateMember(index, 'bio', val)}
								help="Short bio about the team member"
							/>
							<div style={{ marginBottom: '10px' }}>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => updateMember(index, 'image', media.url)}
										allowedTypes={['image']}
										value={member.image}
										render={({ open }) => (
											<Button onClick={open} isPrimary size="small">
												{member.image ? __('Change Image', 'lc-immeasurable-block-widgets-collection') : __('Select Image', 'lc-immeasurable-block-widgets-collection')}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							</div>
							<Button isDestructive onClick={() => removeMember(index)} size="small">
								{__('Remove Member', 'lc-immeasurable-block-widgets-collection')}
							</Button>
						</div>
					))}
					<Button isPrimary onClick={addMember}>
						{__('Add Team Member', 'lc-immeasurable-block-widgets-collection')}
					</Button>
				</PanelBody>

				<PanelBody title={__('Settings', 'lc-immeasurable-block-widgets-collection')}>
					<RangeControl
						label={__('Columns', 'lc-immeasurable-block-widgets-collection')}
						value={columns}
						onChange={(val) => setAttributes({ columns: val })}
						min={1}
						max={4}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'lc-immeasurable-block-widgets-collection')}>
					<div style={{ marginBottom: '15px' }}>
						<label>{__('Text Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={textColor}
							onChange={(val) => setAttributes({ textColor: val })}
						/>
					</div>
					<div>
						<label>{__('Background Color', 'lc-immeasurable-block-widgets-collection')}</label>
						<ColorPalette
							value={bgColor}
							onChange={(val) => setAttributes({ bgColor: val })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="lcibwc-team-grid">
					{members.map((member) => (
						<div key={member.id} className="lcibwc-team-card">
							{member.image && <img src={member.image} alt={member.name} className="lcibwc-team-image" />}
							<h3 className="lcibwc-team-name">{member.name}</h3>
							<p className="lcibwc-team-role">{member.role}</p>
							<p className="lcibwc-team-bio">{member.bio}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
