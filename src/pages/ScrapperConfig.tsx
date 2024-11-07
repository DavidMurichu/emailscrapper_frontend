import { AnalyticsForm, Field } from "./formstemplate"; // Importing both AnalyticsForm and Field

type Props = {
  title?: string;
  subheader?: string;
};

export function SocialMediaConfig(props: Omit<Props, 'fields'>) {
  const fields: Field[] = [
  
    { name: 'keyword', label: 'Social media name', type: 'text', required: true },
    { name: 'country', label: 'country', type: 'text' },

  ];

  return (
    <AnalyticsForm
      {...props}
      title="Social Media Extracting"
      fields={fields}
    />
  );
}

export function UrlConfig(props: Omit<Props, 'fields'>) {
    const fields: Field[] = [
      { name: 'url', label: 'URL', type: 'text', required: true },
      { name: 'country', label: 'country', type: 'text' },
    { name: 'keyword', label: 'Keyword', type: 'text'},

  
    ];
  
    return (
      <AnalyticsForm
        {...props}
        title="Web Page Extracting"
        fields={fields}
      />
    );
  }
 

  export function DarkWebConfig(props: Omit<Props, 'fields'>) {
    const fields: Field[] = [
    { name: 'keyword', label: 'onion url', type: 'text', required: true },
    { name: 'country', label: 'country', type: 'text' },
  
    ];
  
    return (
      <AnalyticsForm
        {...props}
        title="Web Page Extracting"
        fields={fields}
      />
    );
  }
 