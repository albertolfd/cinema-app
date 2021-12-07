import React, { FC } from 'react';
import { Grid, Typography, Box, Link } from '@mui/material';

interface TitleAndContentViewProps {
  title: string;
  content: string | Array<string>;
  contentComponent?: 'Typography' | 'Link';
}

const TitleAndContentView: FC<TitleAndContentViewProps> = (props: TitleAndContentViewProps) => {
  const { title, content, contentComponent } = props;

  return (
    <Box>
      <Grid container direction="column">
        <Grid item marginBottom={3}>
          <Typography variant="h6" color="textPrimary" fontWeight="bold">
            {title}
          </Typography>
        </Grid>

        {typeof content === 'string' ? (
          <Grid item>
            {contentComponent === 'Link' ? (
              <Link variant="highlight" href={content}>
                {content}
              </Link>
            ) : (
              <Typography variant="highlight">{content}</Typography>
            )}
          </Grid>
        ) : (
          content.map((item) => {
            return (
              <Grid item key={`Title-Content-View-Item-${item}`} marginBottom={2}>
                {contentComponent === 'Link' ? (
                  <Link variant="highlight" href={item}>
                    {item}
                  </Link>
                ) : (
                  <Typography variant="highlight">{item}</Typography>
                )}
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default TitleAndContentView;
