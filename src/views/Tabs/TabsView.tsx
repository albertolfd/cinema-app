import { Box, Tabs, Tab, useMediaQuery, useTheme, Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import './TabsView.scss';

export interface TabViewProps {
  label: string;
  tabContent: JSX.Element;
}

interface TabsViewProps {
  tabs: Array<TabViewProps>;
}

const TabsView: FC<TabsViewProps> = (props: TabsViewProps) => {
  const { tabs } = props;

  const [activeTab, setActiveTab] = useState(0);

  const theme = useTheme();
  const isMobileSizeScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Grid container direction="column">
        <Grid
          item
          marginBottom={7}
          display="flex"
          justifyContent={isMobileSizeScreen ? 'start' : 'center'}
        >
          <Tabs
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
            orientation={isMobileSizeScreen ? 'vertical' : 'horizontal'}
            sx={{ width: '100%' }}
            className="tabs"
          >
            {tabs.map((tab) => {
              return <Tab key={`Tab-${tab.label}`} label={tab.label} className="tab" />;
            })}
          </Tabs>
        </Grid>

        <Grid item>{tabs[activeTab].tabContent}</Grid>
      </Grid>
    </Box>
  );
};

export default TabsView;
