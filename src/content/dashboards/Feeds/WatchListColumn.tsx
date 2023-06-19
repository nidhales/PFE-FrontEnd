import {
  Card,
  Box,
  Typography,
  Avatar,
  Grid,
  alpha,
  styled,
  CardActions,
  TextField,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';
import Label from 'src/components/Label';
import Text from 'src/components/Text';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import { useState } from 'react';
import { useGetAllErrorsQuery } from 'src/redux/api/Errors/errorApi';
import { SolutionBox } from './WatchList.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAddSolutionToErrorMutation } from 'src/redux/api/solutions/solutionApi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(2)};
`
);
const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function WatchListColumn() {
  const [showCommentSection, setShowCommentSection] = useState(true);
  const [solutionFields, setSolutionFields] = useState({
    guide: '',
    code: ''
  });

  const handleSolutionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSolutionFields({
      ...solutionFields,
      [e.target.name]: e.target.value
    });
  };

  // API Calls
  const { data: errors, isLoading, refetch } = useGetAllErrorsQuery();
  const [addSoutionToError, { isSuccess: addSuccess }] =
    useAddSolutionToErrorMutation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [likes, setLikes] = useState(0);
  const [active, setActive] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
    setActive(!active);
  };

  const handleSubmitSoutionToError = async (id: string) => {
    await addSoutionToError({
      id: id,
      code: solutionFields.code,
      guide: solutionFields.guide
    });
    await refetch();
  };

  if (isLoading) return <CircularProgress color="primary" />;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      {errors?.map((error) => (
        <Grid item md={12} xs={12} key={error.id}>
          <Card
            sx={{
              overflow: 'visible'
            }}
          >
            <Box
              sx={{
                p: 5
              }}
            >
              <Box display="flex" alignItems="center">
                <AvatarWrapper>
                  <img
                    alt="BTC"
                    src="/static/images/placeholders/logo/avatarNidhal.png"
                  />{' '}
                </AvatarWrapper>
                <Box>
                  <Typography variant="h4" noWrap>
                    Nidhal Boussaa
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: isMobile ? 'column' : 'row',
                  pt: 3
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    pr: 1,
                    mb: 3
                  }}
                >
                  {error.ErrorName}
                </Typography>

                <Typography variant="h6" sx={{ mb: 2 }}>
                  {!isMobile && '|'} Category
                  <Label color="success">tags</Label>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  p: 1,
                  boxShadow: 10,
                  backgroundColor: '#f2f2f2'
                }}
                style={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace'
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ mb: 2 }}
                  style={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                  }}
                >
                  {error.ErrorDescription}
                </Typography>
              </Box>

              <CardActionsWrapper
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: isMobile ? 'column' : 'row'
                }}
              >
                <Box display="flex">
                  <Button
                    color="success"
                    startIcon={<ThumbUpAltTwoToneIcon />}
                    variant="contained"
                    sx={{
                      mx: 2
                    }}
                    onClick={handleLike}
                    style={{ backgroundColor: active ? '#BD2222' : '#57CA22' }}
                  >
                    Like
                  </Button>
                  <Button
                    color="success"
                    startIcon={<ShareTwoToneIcon />}
                    variant="outlined"
                  >
                    Share
                  </Button>
                </Box>
                <Box display="flex" sx={{ mt: { xs: 2, md: 0 } }}>
                  <Typography variant="subtitle2" component="span">
                    <Text color="black">
                      <span>
                        {likes} {likes === 1 ? 'reaction •' : 'reactions •'}
                      </span>
                    </Text>{' '}
                    <Text color="black">
                      <b>{error.solutions.length}</b>
                    </Text>{' '}
                    comments
                  </Typography>
                </Box>
              </CardActionsWrapper>
              <Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Try to Help by adding your solution</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      label="guide"
                      margin="dense"
                      name="guide"
                      required
                      value={solutionFields.guide}
                      onChange={handleSolutionChange}
                      multiline
                    />
                    <TextField
                      fullWidth
                      label="code"
                      margin="dense"
                      name="code"
                      value={solutionFields.code}
                      onChange={handleSolutionChange}
                      multiline
                    />
                    <Button
                      fullWidth
                      sx={{
                        '&:hover': {
                          background: 'inherit'
                        }
                      }}
                      onClick={() => handleSubmitSoutionToError(error.id)}
                    >
                      Submit
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Box>
              {error.solutions.map((solution) => (
                <SolutionBox key={solution.id}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h4">{solution.guide}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <SyntaxHighlighter
                        showLineNumbers={true}
                        language="stylus"
                        style={dracula}
                      >
                        {solution.code}
                      </SyntaxHighlighter>
                    </AccordionDetails>
                  </Accordion>
                </SolutionBox>
              ))}
            </Box>
          </Card>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}

export default WatchListColumn;
