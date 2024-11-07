import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: { value: string; label: string; total: number }[];
  onclick: (item: { value: string; label: string; total: number }) => void;
};

export function AnalyticsTrafficBySite({ title, subheader, onclick, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
        {list.map((site) => (
          <Box
            key={site.label}
            sx={(theme) => ({
              py: 2.5,
              display: 'flex',
              borderRadius: 1.5,
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: `solid 1px ${theme.palette.grey[500]}`,
            })}
          >
            {site.value === 'Start' && (
              <Button size="small" onClick={() => onclick(site)}>
                Start
              </Button>
            )}
            {site.value === 'Stop' && (
              <Button size="small" onClick={() => onclick(site)}>
                Stop
              </Button>
            )}
            {site.value === 'Download' && (
              <Button size="small" onClick={() => onclick(site)}>
                Download
              </Button>
            )}
            {site.value === 'Send' && (
              <Button size="small" onClick={() => onclick(site)}>
                Send
              </Button>
            )}

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {site.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
