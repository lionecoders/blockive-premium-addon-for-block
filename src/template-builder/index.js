import './style.css';
import { registerTemplateEditorStore } from './store';
import registerTemplateSettingsPanel from './template-settings-panel';
import registerDisplayConditionsPanel from './display-conditions-panel';
import registerDynamicContentControl from './dynamic-content-control';

registerTemplateEditorStore();
registerTemplateSettingsPanel();
registerDisplayConditionsPanel();
registerDynamicContentControl();
