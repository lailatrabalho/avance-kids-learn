import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ConfigService, WebsiteConfig, HeroSection, Benefit, Package, Testimonial, TargetAudience, ThankYouConfig } from '@/services/configService';

export interface ConfigData {
  websiteConfig: WebsiteConfig | null;
  heroSection: HeroSection | null;
  benefits: Benefit[];
  packages: Package[];
  testimonials: Testimonial[];
  targetAudience: TargetAudience | null;
  thankYouConfig: ThankYouConfig | null;
  loading: boolean;
  error: string | null;
}

export const useRealTimeConfig = () => {
  const [config, setConfig] = useState<ConfigData>({
    websiteConfig: null,
    heroSection: null,
    benefits: [],
    packages: [],
    testimonials: [],
    targetAudience: null,
    thankYouConfig: null,
    loading: true,
    error: null,
  });

  const loadConfig = async () => {
    try {
      setConfig(prev => ({ ...prev, loading: true, error: null }));

      const [
        websiteConfig,
        heroSection,
        benefits,
        packages,
        testimonials,
        targetAudience,
        thankYouConfig,
      ] = await Promise.all([
        ConfigService.getWebsiteConfig(),
        ConfigService.getHeroSection(),
        ConfigService.getBenefits(),
        ConfigService.getPackages(),
        ConfigService.getTestimonials(),
        ConfigService.getTargetAudience(),
        ConfigService.getThankYouConfig(),
      ]);

      setConfig({
        websiteConfig,
        heroSection,
        benefits,
        packages,
        testimonials,
        targetAudience,
        thankYouConfig,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error loading config:', error);
      setConfig(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar configurações',
      }));
    }
  };

  useEffect(() => {
    loadConfig();

    // Set up real-time subscriptions
    const channels = [
      supabase
        .channel('website_config_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'website_config' }, () => {
          ConfigService.getWebsiteConfig().then(data => {
            setConfig(prev => ({ ...prev, websiteConfig: data }));
          });
        })
        .subscribe(),

      supabase
        .channel('hero_section_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_section' }, () => {
          ConfigService.getHeroSection().then(data => {
            setConfig(prev => ({ ...prev, heroSection: data }));
          });
        })
        .subscribe(),

      supabase
        .channel('benefits_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'benefits' }, () => {
          ConfigService.getBenefits().then(data => {
            setConfig(prev => ({ ...prev, benefits: data }));
          });
        })
        .subscribe(),

      supabase
        .channel('packages_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'packages' }, () => {
          ConfigService.getPackages().then(data => {
            setConfig(prev => ({ ...prev, packages: data }));
          });
        })
        .subscribe(),

      supabase
        .channel('testimonials_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
          ConfigService.getTestimonials().then(data => {
            setConfig(prev => ({ ...prev, testimonials: data }));
          });
        })
        .subscribe(),

      supabase
        .channel('target_audience_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'target_audience' }, () => {
          ConfigService.getTargetAudience().then(data => {
            setConfig(prev => ({ ...prev, targetAudience: data }));
          });
        })
        .subscribe(),

      supabase
        .channel('thank_you_config_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'thank_you_config' }, () => {
          ConfigService.getThankYouConfig().then(data => {
            setConfig(prev => ({ ...prev, thankYouConfig: data }));
          });
        })
        .subscribe(),
    ];

    // Cleanup function
    return () => {
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, []);

  return { config, refreshConfig: loadConfig };
};