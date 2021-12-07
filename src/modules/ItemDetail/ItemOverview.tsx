import { Grid, Typography } from '@mui/material';
import Credits from 'models/Credits';
import Movie from 'models/Movie';
import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getImagePath, GetMovie, GetMovieCredits } from 'services/MovieService';
import formatQuantityMoney from 'utils/FormatQuantityMoney';
import sortAlphabetically from 'utils/SortAlphabetically';
import DividerView from 'views/Divider/DividerView';
import ImagePoster from 'views/ImageViews/ImagePoster/ImagePoster';
import TitleAndContentView from 'views/MovieViews/MovieTitleAndContentView/MovieTitleAndContentView';

interface ItemOverviewProps {
  movieId: string;
}

const ItemOverview: FC<ItemOverviewProps> = (props: ItemOverviewProps) => {
  const { movieId } = props;

  const movieQuery = useQuery<Movie, Error>(['getMovie', movieId], () => GetMovie(Number(movieId)));
  const movie = movieQuery.data;

  const creditsQuery = useQuery<Credits, Error>(['getMovieCredits', movieId], () =>
    GetMovieCredits(Number(movieId))
  );

  const cast = useMemo(() => {
    const castMembers = creditsQuery.data?.cast;

    if (castMembers) {
      return castMembers.sort((castMemberA, castMemberB) =>
        sortAlphabetically(castMemberA.name, castMemberB.name)
      );
    }
    return [];
  }, [creditsQuery.data]);

  const productionCompanies = useMemo(() => {
    const companies = movie?.production_companies;

    if (companies) {
      return companies.sort((companyA, companyB) =>
        sortAlphabetically(companyA.name, companyB.name)
      );
    }
    return [];
  }, [movie?.production_companies]);

  const languages = useMemo(() => {
    const languageList = movie?.spoken_languages;

    if (languageList) {
      return languageList.sort((languageA, languageB) =>
        sortAlphabetically(languageA.name, languageB.name)
      );
    }
    return [];
  }, [movie?.spoken_languages]);

  return (
    <>
      {movie && (
        <Grid container width="100%" spacing={4}>
          {/** Overview & cast */}
          <Grid item container direction="column" marginBottom={3} xs={8}>
            <Grid item marginBottom={5}>
              <Typography color="textSecondary">{movie.overview}</Typography>
            </Grid>

            <Grid item container direction="column">
              <Grid item marginBottom={5}>
                <Typography variant="h6" color="textPrimary" fontWeight="bold">
                  Cast
                </Typography>

                <DividerView />
              </Grid>

              {cast.map((castMember) => {
                return (
                  <Grid
                    key={`Cast-Member-${castMember.id}`}
                    item
                    container
                    marginBottom={2}
                    display="flex"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item marginRight={3}>
                      <ImagePoster
                        src={getImagePath(castMember.profile_path)}
                        alt={`Cast-Member-Profile-${castMember.id}`}
                        height={80}
                        width={54}
                      />
                    </Grid>

                    <Grid item container xs spacing={1}>
                      <Grid item flexGrow={1}>
                        <Typography variant="highlight">{castMember.name}</Typography>
                      </Grid>

                      <Grid item marginRight={3}>
                        <Typography color="textSecondary">{castMember.character}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          {/** Production companies, languages, tagline, budget, revenue, status, release date & run time */}
          <Grid item container direction="column" xs={4} spacing={5}>
            <Grid item>
              <TitleAndContentView
                title="Homepage"
                content={movie.homepage}
                contentComponent="Link"
              />
            </Grid>

            <Grid item container direction="column">
              <Grid item marginBottom={3}>
                <Typography variant="h6" color="textPrimary" fontWeight="bold">
                  Production Companies
                </Typography>
              </Grid>

              {productionCompanies.map((company) => {
                return (
                  <Grid
                    key={`Production-Company-${company.id}`}
                    item
                    container
                    marginBottom={2}
                    display="flex"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <ImagePoster
                        src={getImagePath(company.logo_path)}
                        alt={`Production-Company-Logo-${company.id}`}
                        height={20}
                        width={100}
                      />
                    </Grid>

                    <Grid item>
                      <Typography variant="highlight">{company.name}</Typography>
                    </Grid>

                    <Grid item>
                      <Typography color="textSecondary">{company.origin_country}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>

            <Grid item>
              <TitleAndContentView
                title="Languages"
                content={languages.map((language) => language.name)}
              />
            </Grid>

            <Grid item>
              <TitleAndContentView title="Tagline" content={movie.tagline} />
            </Grid>

            <Grid item>
              <TitleAndContentView title="Budget" content={formatQuantityMoney(movie.budget)} />
            </Grid>

            <Grid item>
              <TitleAndContentView title="Revenue" content={formatQuantityMoney(movie.revenue)} />
            </Grid>

            <Grid item>
              <TitleAndContentView title="Status" content={movie.status} />
            </Grid>

            <Grid item>
              <TitleAndContentView title="Release Date" content={movie.release_date.toString()} />
            </Grid>

            <Grid item>
              <TitleAndContentView title="Run Time" content={movie.runtime.toString()} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ItemOverview;
