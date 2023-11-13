import {
  Avatar,
  Badge,
  Card,
  Stack,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Input,
  IconButton
} from '@mui/material'
import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send'
import { v4 as uuidv4 } from 'uuid'
import PerfectScrollbarComponent, { ScrollBarProps } from 'react-perfect-scrollbar'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

const PerfectScrollbar = styled(PerfectScrollbarComponent)<ScrollBarProps & { ref: React.Ref<unknown> }>(
  ({ theme }) => ({
    padding: theme.spacing(5),
    maxHeight: '70%'
  })
)
const infoChatbot = {
  nombre: 'Celeste',
  colorVentana: '#9155fd'
}
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

const ChatbotComponent = () => {
  const router = useRouter()
  console.log(router)

  const info: any = typeof router?.query?.info === 'string' ? JSON.parse(router?.query?.info) : {}
  // @ts-ignore

  /*   ? JSON.parse(searchParams.get('info'))
    : {
        nombre: 'Celeste',
        colorVentana: '#9155fd'
      } */
  console.log(info)
  const [inputValue, setInputValue] = React.useState('')
  const chatLogs = [
    {
      id: 1,
      isBot: uuidv4(),
      dialogo: `Hola mi nombre es ${
        info?.nombre || infoChatbot.nombre
      } y soy tu asistente virtual. Cómo puedo ayudarte?`
    }
  ]
  const [chats, setChats] = React.useState(chatLogs)
  const [isLoading, setIsLoading] = React.useState(false)
  const chatArea = React.useRef(null)

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  const createChat = () => {
    if (inputValue) {
      //@ts-ignore
      setChats(prev => [...prev, { id: uuidv4(), isBot: 0, dialogo: inputValue }])
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        //@ts-ignore
        setChats(prev => [...prev, { id: uuidv4(), isBot: 1, dialogo: 'De acuerdo, estamos procesando tu solicitud' }])
      }, 1500)
    } else {
      toast.error('Escriba un mensaje para continuar', {
        duration: 1500,
        style: {
          zIndex: 99901
        }
      })
    }
  }
  const scrollToBottom = () => {
    console.log(chatArea.current)
    if (chatArea.current) {
      // @ts-ignore
      chatArea.current.scrollTop = chatArea.current.scrollHeight
    }
  }

  useEffect(() => {
    console.log('entre')
    scrollToBottom()
  }, [chats])
  const handleKeyDown = e => {
    if (e.key === 'Enter' && inputValue) {
      createChat()
      setInputValue('')
    } else if (e.key === 'Enter' && !inputValue) {
      toast.error('Escriba un mensaje para continuar', {
        duration: 1500,
        style: {
          zIndex: 99901
        }
      })
    }
  }

  return (
    <Card
      sx={{
        height: '100%',

        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Stack spacing={2} sx={{ height: '100%', width: '100%' }}>
        <Stack sx={{ padding: '1rem' }} alignItems='center' direction='row' spacing={2}>
          <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
            <Avatar alt={info?.nombre || infoChatbot.nombre} src={'/images/bot-chatbot.svg'} />
          </StyledBadge>
          <Stack>
            <Typography sx={{ textTransform: 'capitalize' }} variant='body2' fontWeight={600}>
              {info?.nombre || infoChatbot.nombre}
            </Typography>
            <Typography variant='body2'>Disponible ahora</Typography>
          </Stack>
        </Stack>
        <Divider /*  orientation='hor'  */ flexItem />

        {/*  <PerfectScrollbar ref={chatArea1} options={{ wheelPropagation: false, suppressScrollX: true }}> */}
        <Stack
          ref={chatArea}
          sx={{
            p: 2,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {chats.map(chat => {
            return (
              <Stack key={chat.id} spacing={1} sx={{ padding: '0.5rem' }}>
                <Typography sx={{ alignSelf: chat.isBot ? 'flex-start' : 'flex-end' }} variant='body2' fontWeight={400}>
                  {chat.isBot ? info?.nombre || infoChatbot.nombre : 'Tú'}
                </Typography>{' '}
                <Card
                  sx={{
                    backgroundColor: chat.isBot ? info?.background || infoChatbot.colorVentana : '#e5e5e5',
                    padding: '0.5rem',
                    width: '70%',
                    overflow: 'initial',
                    alignSelf: chat.isBot ? 'flex-start' : 'flex-end',
                    borderRadius: '15px',
                    borderStartStartRadius: chat.isBot ? 0 : '15px',
                    borderStartEndRadius: chat.isBot ? '15px' : 0
                  }}
                >
                  <Typography variant='body2' color={chat.isBot ? info?.colorTextBot || 'white' : 'gray'}>
                    {' '}
                    {chat.dialogo}
                  </Typography>
                </Card>
              </Stack>
            )
          })}
        </Stack>
        {/* </PerfectScrollbar> */}
        <Stack direction='row' spacing={2}>
          <TextField
            fullWidth
            placeholder='Aqui va el mensaje'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={inputValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => {
                      createChat()
                      setInputValue('')
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>

                /*   
              <InputAdornment position='end' sx={{ zIndex: 1000 }} onClick={handleKeyDown}>
                <SendIcon />
              </InputAdornment> */
              )
            }}
          />

          {/* <Input
          fullWidth
          placeholder='Aqui va el mensaje'
          startAdornment={
            <InputAdornment position='end'>
              <SendIcon />
            </InputAdornment>
          }
        /> */}
          {/*  <IconButton aria-label='delete'>
        <SendIcon />
      </IconButton> */}
        </Stack>
      </Stack>
    </Card>
  )
}

export default ChatbotComponent
