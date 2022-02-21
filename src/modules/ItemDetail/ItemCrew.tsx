import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Credits from 'models/Credits';
import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getImagePath, GetMovieCredits } from 'services/MovieService';
import DividerView from 'views/Divider/DividerView';
import ImagePoster from 'views/ImageViews/ImagePoster/ImagePoster';

interface ItemCrewProps {
  movieId: string;
}

const ItemCrew: FC<ItemCrewProps> = (props: ItemCrewProps) => {
  const { movieId } = props;

  const theme = useTheme();
  const isMobileSizeScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const creditsQuery = useQuery<Credits, Error>(['getMovieCredits', movieId], () =>
    GetMovieCredits(Number(movieId))
  );

  const crew = useMemo(() => {
    const crewMembers = creditsQuery.data?.crew;

    if (crewMembers) {
      return crewMembers.sort((crewMemberA, crewMemberB) =>
        crewMemberA.name.localeCompare(crewMemberB.name)
      );
    }
    return [];
  }, [creditsQuery.data]);

  return (
    <Grid container direction="column">
      <Grid item marginBottom={5}>
        <Typography variant="h6" color="textPrimary" fontWeight="bold">
          Crew
        </Typography>

        <DividerView />
      </Grid>

      {isMobileSizeScreen ? (
        <>
          <Grid item container marginBottom={2}>
            <Grid item container width="40%" spacing={2} />

            <Grid item container flexGrow={1} width="60%">
              <Grid item width="50%">
                <Typography color="textPrimary" fontWeight="bold">
                  Department
                </Typography>
              </Grid>

              <Grid item marginLeft="7px">
                <Typography color="textPrimary" fontWeight="bold">
                  Job
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {crew.map((crewMember) => {
            return (
              <Grid key={`Crew-Member-${crewMember.id}`} item container marginBottom={2}>
                <Grid item container direction="column" width="40%" spacing={2}>
                  <Grid item>
                    <ImagePoster
                      src={getImagePath(crewMember.profile_path)}
                      alt={`Crew-Member-Profile-${crewMember.id}`}
                      height={80}
                      width={54}
                    />
                  </Grid>

                  <Grid item>
                    <Typography variant="highlight">{crewMember.name}</Typography>
                  </Grid>
                </Grid>

                <Grid item container flexGrow={1} width="60%" spacing={2}>
                  <Grid item width="50%">
                    <Typography color="textSecondary">{crewMember.department}</Typography>
                  </Grid>

                  <Grid item width="50%">
                    <Typography color="textSecondary">{crewMember.job}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
          )
        </>
      ) : (
        <>
          <Grid
            item
            container
            marginBottom={2}
            display="flex"
            alignItems="center"
            justifyContent="end"
            spacing={2}
          >
            <Grid item container xs={8} spacing={2} display="flex">
              <Grid item xs={6}>
                <Typography color="textPrimary" fontWeight="bold">
                  Department
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="textPrimary" fontWeight="bold">
                  Job
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {crew.map((crewMember) => {
            return (
              <Grid
                key={`Crew-Member-${crewMember.id}`}
                item
                container
                marginBottom={2}
                display="flex"
                alignItems="center"
                spacing={2}
              >
                <Grid item container xs={4} display="flex" alignItems="center" spacing={3}>
                  <Grid item>
                    <ImagePoster
                      src={getImagePath(crewMember.profile_path)}
                      alt={`Crew-Member-Profile-${crewMember.id}`}
                      height={80}
                      width={54}
                    />
                  </Grid>

                  <Grid item xs>
                    <Typography variant="highlight">{crewMember.name}</Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  xs={8}
                  spacing={2}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Grid item xs>
                    <Typography color="textSecondary">{crewMember.department}</Typography>
                  </Grid>

                  <Grid item xs>
                    <Typography color="textSecondary">{crewMember.job}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default ItemCrew;
