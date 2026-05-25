import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, Card, Icon, Input } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import createWeightValidation from './validationWeight/validationWeight';
import { useLanguage } from '../../context/LanguageContext';

const WeightInput = ({ route, navigation }) => {
  const { t } = useLanguage();
  const sessionId = route?.params?.sessionId;
  const [weight, setWeight] = useState('');
  const [weightBefore, setWeightBefore] = useState(null);
  const [sessionStatus, setSessionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const validationSchema = useMemo(
    () =>
      createWeightValidation({
        required: t.patientProfile.weightRequired,
        invalid: t.patientProfile.weightInvalid,
      }),
    [t]
  );

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get(`/dialysis-sessions/${sessionId}`);
        setSessionStatus(data?.status || null);

        if (data?.weight_before != null) {
          setWeightBefore(data.weight_before);
        }

        if (data?.weight_after != null) {
          setWeight(String(data.weight_after));
        }
      } catch (fetchError) {
        console.log('WeightInput fetch error:', fetchError.response?.data || fetchError.message);
        Alert.alert(t.error, t.patientProfile.weightSaveFailed);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, t]);

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError('');

      const weightValue = Number.parseFloat(weight);
      await validationSchema.validate({ weight: weightValue }, { abortEarly: false });

      const payload = {
        weightAfter: weightValue,
      };

      if (sessionStatus !== 'COMPLETED') {
        payload.status = 'COMPLETED';
      }

      await api.patch(`/dialysis-sessions/${sessionId}/status`, payload);
      await AsyncStorage.setItem(`weight_entered_${sessionId}`, '1');

      Alert.alert(t.success, t.patientProfile.weightSaved, [
        {
          text: t.confirm,
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (submitError) {
      if (submitError.name === 'ValidationError') {
        setError(submitError.errors?.[0] || t.patientProfile.weightInvalid);
      } else {
        console.log('WeightInput save error:', submitError.response?.data || submitError.message);
        setError(t.patientProfile.weightSaveFailed);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#26CDD6" />
        <Text style={styles.loaderText}>{t.loading}</Text>
      </View>
    );
  }

  if (!sessionId) {
    return (
      <View style={styles.loaderContainer}>
        <Icon name="alert-circle-outline" type="material-community" size={54} color="#DE1A1C" />
        <Text style={styles.missingTitle}>{t.error}</Text>
        <Text style={styles.missingText}>Missing session reference for weight submission.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <Icon name="scale-bathroom" type="material-community" size={24} color="#193B6B" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>{t.patientProfile.weightAfterTitle}</Text>
            <Text style={styles.subtitle}>{t.patientProfile.weightAfterSubtitle}</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Session</Text>
            <Text style={styles.summaryValue}>#{sessionId}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{t.patientSessionScreen.weightBefore}</Text>
            <Text style={styles.summaryValue}>
              {weightBefore != null ? `${weightBefore} kg` : '--'}
            </Text>
          </View>
        </View>

        <Input
          placeholder={t.patientSessionScreen.weightPlaceholder}
          value={weight}
          onChangeText={(value) => {
            setWeight(value);
            setError('');
          }}
          keyboardType="decimal-pad"
          errorMessage={error}
          leftIcon={
            <Icon name="weight-kilogram" type="material-community" size={22} color="#26CDD6" />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputWrapper}
          errorStyle={styles.errorText}
        />

        <Button
          title={saving ? t.loading : t.patientProfile.weightAfterTitle}
          loading={saving}
          onPress={handleSubmit}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />

        <Button
          title={t.cancel}
          type="clear"
          onPress={() => navigation.goBack()}
          titleStyle={styles.cancelText}
          containerStyle={styles.cancelButton}
        />
      </Card>
    </View>
  );
};

export default WeightInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F1FCFD',
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: '#BCEFF3',
    shadowColor: '#193B6B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 14,
  },
  headerText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 21,
    fontWeight: '900',
    color: '#193B6B',
    textAlign: 'right',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#8296B1',
    textAlign: 'right',
    lineHeight: 20,
  },
  summaryBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summaryLabel: {
    color: '#8296B1',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryValue: {
    color: '#193B6B',
    fontSize: 16,
    fontWeight: '900',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 14,
  },
  inputWrapper: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
    borderWidth: 1.5,
    borderColor: '#BCEFF3',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 58,
  },
  inputStyle: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '700',
    color: '#193B6B',
  },
  errorText: {
    textAlign: 'right',
    color: '#DE1A1C',
    fontWeight: '700',
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 16,
  },
  button: {
    backgroundColor: '#193B6B',
    borderRadius: 16,
    height: 56,
  },
  cancelButton: {
    marginTop: 8,
  },
  cancelText: {
    color: '#8296B1',
    fontWeight: '700',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1FCFD',
    paddingHorizontal: 24,
  },
  loaderText: {
    marginTop: 12,
    color: '#8296B1',
    fontSize: 14,
    fontWeight: '700',
  },
  missingTitle: {
    marginTop: 16,
    color: '#193B6B',
    fontSize: 18,
    fontWeight: '900',
  },
  missingText: {
    marginTop: 8,
    color: '#8296B1',
    fontSize: 14,
    textAlign: 'center',
  },
});
