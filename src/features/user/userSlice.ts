import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getAddress } from '../../services/apiGeocoding'

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk('user/fectchAddress', async function () {
  // 1) We get the user's geolocation position
  const positionObj: GeolocationPosition = await getPosition()
  const position = {
    latitude: positionObj.coords.latitude.toString(),
    longitude: positionObj.coords.longitude.toString()
  }

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position)
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

  // 3) Then we return an object with the data that we are interested in
  // Payload is the FULLDILLED state
  return { position, address }
})

interface position {
  latitude?: string
  longitude?: string
}

export interface UserState {
  userName: string
  status: string
  position: position
  address: string
  error: string | undefined
}

const initialState: UserState = {
  userName: '',
  status: 'idle',
  position: {},
  address: '',
  error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.userName = action.payload
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position
        state.address = action.payload.address
        state.status = 'idle'
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })
})

export const getUserName = (state: RootState) => state.user.userName

export const { updateName } = userSlice.actions

export default userSlice.reducer
