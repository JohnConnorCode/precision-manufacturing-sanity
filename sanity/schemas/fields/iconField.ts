import IconPicker from '../../components/IconPicker';

/**
 * Reusable icon field with visual picker for Lucide icons
 *
 * Usage in schemas:
 * import { iconField } from './fields/iconField'
 *
 * fields: [
 *   iconField(), // default: name='iconName', title='Icon'
 *   iconField('customIcon', 'Custom Icon Name'), // custom name & title
 *   iconField('icon', 'Select Icon', 'Choose an icon from Lucide library'), // with description
 * ]
 */
export function iconField(
  name: string = 'iconName',
  title: string = 'Icon',
  description?: string
) {
  return {
    name,
    type: 'string',
    title,
    description: description || `Lucide icon name (e.g., "Cog", "Shield", "Award")`,
    components: {
      input: IconPicker,
    },
  };
}

export default iconField;
