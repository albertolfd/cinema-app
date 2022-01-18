import { Grid, Typography } from '@mui/material';
import MovieImages from 'models/MovieImages';
import MovieVideos from 'models/MovieVideos';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { getImagePath, GetMovieImages, GetMovieVideos } from 'services/MovieService';
import DividerView from 'views/Divider/DividerView';
import ImageListView from 'views/lists/ImageList/ImageListView';

interface ItemMediaProps {
  movieId: string;
}

const ItemMedia: FC<ItemMediaProps> = (props: ItemMediaProps) => {
  const { movieId } = props;

  const imagesQuery = useQuery<MovieImages, Error>(['getMovieImages', movieId], () =>
    GetMovieImages(Number(movieId))
  );
  const videosQuery = useQuery<MovieVideos, Error>(['getMovieVideos', movieId], () =>
    GetMovieVideos(Number(movieId))
  );

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography variant="h6" color="textPrimary" fontWeight="bold">
          Watch Trailer
        </Typography>

        <DividerView />
      </Grid>

      <Grid item container spacing={2}>
        {videosQuery.data?.results.map((video) => {
          return (
            <Grid item container xs={4} spacing={1} direction="column">
              <Grid item>
                <iframe
                  title={video.name}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: '5px', width: '100%' }}
                />
              </Grid>

              <Grid item>
                <Typography variant="highlight">{video.name}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Grid item>
        <Typography variant="h6" color="textPrimary" fontWeight="bold">
          Photos ({imagesQuery.data?.posters.length})
        </Typography>

        <DividerView />
      </Grid>

      <Grid item container>
        <ImageListView
          loading={imagesQuery.isLoading}
          items={
            imagesQuery.data?.posters
              ? imagesQuery.data?.posters.map((poster) => {
                  return {
                    key: poster.file_path,
                    image: getImagePath(poster.file_path)
                  };
                })
              : []
          }
        />
      </Grid>
    </Grid>
  );
};

export default ItemMedia;
