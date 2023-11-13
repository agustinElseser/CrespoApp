import { FormControl /* FormHelperText */ } from '@mui/material'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

/* import 'react-phone-input-2/lib/style.css' */

/* type Iprops = {
  name: string
} */

const PhoneField = ({ name, disabled = false }: any) => {
  /*  const [errorValidated, setErrorValidated] = useState(false) */

  const {
    control,
    setValue

    /* formState: { errors } */
  } = useFormContext()

  const keyValue = useWatch({ control, name })
  console.log({ keyValue })

  return (
    <>
      <FormControl sx={{ height: '100%' }} fullWidth>
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={() => {
            return (
              <PhoneInput
                specialLabel='Teléfono'
                disabled={disabled}
                containerStyle={{ width: '100%', height: '100%', display: 'flex' }}
                inputStyle={{ height: '100%', width: '100%', alignSelf: 'stretch', padding: '16.5px 14px 16.5px 58px' }}
                //eslint-disable-next-line
                dropdownStyle={{ padding: '0.5rem' }}
                country={'cl'}
                masks={{ cl: keyValue.startsWith('56') || !keyValue ? '... ... ...' : '... ... ... ...' }}
                onlyCountries={['cl']}
                countryCodeEditable={!keyValue.startsWith('56') && keyValue}
                disableCountryCode={!keyValue.startsWith('56') && keyValue}
                disableDropdown={!keyValue.startsWith('56') && keyValue}
                value={keyValue}
                inputProps={{
                  required: true,
                  placeholder: 'Teléfono',
                  label: 'Teléfono'
                }}
                onChange={e => {
                  setValue(name, e)
                }}
              />
            )
          }}
        />
      </FormControl>
    </>
  )
}

export default PhoneField
