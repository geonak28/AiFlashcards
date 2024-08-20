'use client'
import getStripe from '../utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Container, Box, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Head from 'next/head'

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }


  return (
    <Container maxWidth="lg" sx={{
      //backgroundColor: '#d1ede8', // Replace with your desired color
      minHeight: '100vh',         // Ensure it covers the entire viewport height
      padding: 0,
      background: '#ece9e2'

    }}>
      <Head>
        <title> Flashcard Saas</title>
        <meta name="description" contents='Create flashcars from your text' />
      </Head>
      <AppBar position="static" sx={{
        width: '100%',
        background: 'linear-gradient(to right, #e43d11, #efb11e)'
      }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}> Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in"> Login</Button>
            <Button color="inherit" href="sign-up"> Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <Button color="inherit" onClick={() => router.push('http://localhost:3000')}>
              Home
            </Button>
            <Button color="inherit" href="/generate"> Generate Cards</Button>
            <Button color="inherit" href="/flashcards"> My Cards</Button>
            {' '}
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign: 'center',
        my: 4,
        //backgroundColor: '#9fd9e5',
      }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: '#e43d11' }}> Welcome to FlashcardSaaS</Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#db4665' }}>
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant='contained' href="/generate" sx={{
          mt: 2,
          backgroundColor: '#d5536d',
          '&:hover': {
            backgroundColor: '#fa7893'  // Optional: Color on hover, replace as needed
          }
        }}>
          Get started
        </Button>

      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#e43d11' }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              border: '3px solid',
              borderColor: '#FFFFFF',
              borderRadius: 2,
            }}>
              <Typography varient="h5" gutterBottom> Easy Text Input</Typography>
              <Typography>
                {' '}
                Simple input your text and let our software do the rest. Creating flashcards had never been easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              border: '3px solid',
              borderColor: '#FFFFFF',
              borderRadius: 2,
            }}>
              <Typography varient="h6" gutterBottom> Smart Flashcards</Typography>
              <Typography>
                {' '}
                Breaks down your texts to concise flashcards, perfect for studying the subjects thoroughly.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              border: '3px solid',
              borderColor: '#FFFFFF',
              borderRadius: 2,
            }}>
              <Typography varient="h6" gutterBottom> Accessible Anywhere</Typography>
              <Typography>
                {' '}
                Access your flashcards from anydecive, at any time, study on the go made easier.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#e43d11' }}> Pricing </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '4px solid',
              borderColor: '#FFFFFF',
              borderRadius: 2,
            }}
            >
              <Typography varient="h5" gutterBottom> Basic</Typography>
              <Typography varient="h6" gutterBottom> $5 / Month</Typography>

              <Typography>
                {' '}
                Access to basic flashcards features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '4px solid',
              borderColor: '#FFFFFF',
              borderRadius: 2,
            }}
            >
              <Typography varient="h5" gutterBottom> Pro</Typography>
              <Typography varient="h6" gutterBottom> $10 / Month</Typography>

              <Typography>
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Container>

  )
}