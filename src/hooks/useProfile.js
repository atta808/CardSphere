import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err);
      // Fallback in extreme cases
      setProfile(profileService.generateDefaultProfile());
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  const updateProfile = (updates) => {
    setProfile(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updates
      };
    });
  };

  const saveProfile = async (profileToSave = profile) => {
    try {
      setLoading(true);
      setError(null);
      const success = await profileService.saveProfile(profileToSave);
      if (success) {
        // Reload to get the trimmed and date-updated version
        await loadProfile();
        return true;
      } else {
        setError(new Error('Failed to save profile'));
        return false;
      }
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const newDefault = await profileService.resetProfile();
      setProfile(newDefault);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = useCallback(() => {
    return loadProfile();
  }, [loadProfile]);

  return {
    profile,
    loading,
    error,
    saveProfile,
    updateProfile,
    resetProfile,
    refreshProfile,
    completionPercentage: profileService.calculateCompletionPercentage(profile)
  };
};
