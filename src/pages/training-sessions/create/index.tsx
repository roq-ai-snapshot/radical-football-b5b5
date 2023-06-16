import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTrainingSession } from 'apiSdk/training-sessions';
import { Error } from 'components/error';
import { trainingSessionValidationSchema } from 'validationSchema/training-sessions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { getPlayers } from 'apiSdk/players';
import { getUsers } from 'apiSdk/users';
import { TrainingSessionInterface } from 'interfaces/training-session';

function TrainingSessionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrainingSessionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrainingSession(values);
      resetForm();
      router.push('/training-sessions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrainingSessionInterface>({
    initialValues: {
      date: new Date(new Date().toDateString()),
      drills: '',
      performance_metrics: '',
      player_id: (router.query.player_id as string) ?? null,
      coach_id: (router.query.coach_id as string) ?? null,
    },
    validationSchema: trainingSessionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Training Session
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="date" mb="4">
            <FormLabel>Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.date ? new Date(formik.values?.date) : null}
                onChange={(value: Date) => formik.setFieldValue('date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="drills" mb="4" isInvalid={!!formik.errors?.drills}>
            <FormLabel>Drills</FormLabel>
            <Input type="text" name="drills" value={formik.values?.drills} onChange={formik.handleChange} />
            {formik.errors.drills && <FormErrorMessage>{formik.errors?.drills}</FormErrorMessage>}
          </FormControl>
          <FormControl id="performance_metrics" mb="4" isInvalid={!!formik.errors?.performance_metrics}>
            <FormLabel>Performance Metrics</FormLabel>
            <Input
              type="text"
              name="performance_metrics"
              value={formik.values?.performance_metrics}
              onChange={formik.handleChange}
            />
            {formik.errors.performance_metrics && (
              <FormErrorMessage>{formik.errors?.performance_metrics}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Select Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.personal_information}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'coach_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_session',
  operation: AccessOperationEnum.CREATE,
})(TrainingSessionCreatePage);
