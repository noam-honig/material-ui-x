import * as React from 'react';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { COUNTRY_ISO_OPTIONS } from '../services/static-data';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      option: {
        '& > span': {
          marginRight: 10,
          fontSize: 18,
        },
      },
      inputRoot: {
        ...theme.typography.body2,
        padding: '1px 0',
        height: '100%',
        '& input': {
          padding: '0 16px',
          height: '100%',
        },
      },
    }),
  { defaultTheme },
);

function EditCountry(props: GridRenderEditCellParams) {
  const classes = useStyles();
  const { id, value, api, field } = props;

  const handleChange = React.useCallback(
    (event, newValue) => {
      api.setEditCellValue({ id, field, value: newValue }, event);
      if (!event.key) {
        api.commitCellChange({ id, field });
        api.setCellMode(id, field, 'view');
      }
    },
    [api, field, id],
  );

  return (
    <Autocomplete
      value={value as any}
      onChange={handleChange}
      options={COUNTRY_ISO_OPTIONS}
      getOptionLabel={(option) => option.label}
      autoHighlight
      fullWidth
      open
      classes={classes}
      disableClearable
      renderOption={(optionProps, option) => (
        <li {...optionProps}>
          <span>{countryToFlag(option.code)}</span>
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <InputBase
          autoFocus
          fullWidth
          id={params.id}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          {...params.InputProps}
        />
      )}
    />
  );
}

export function renderEditCountry(params: GridRenderEditCellParams) {
  return <EditCountry {...params} />;
}
