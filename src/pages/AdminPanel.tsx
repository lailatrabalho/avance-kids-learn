import RequireAuth from "@/components/auth/RequireAuth";
import { useState, useEffect } from 'react';
import { ConfigService } from '@/services/configService';

export default function AdminPanel() {
  const [websiteConfig, setWebsiteConfig] = useState<any>(null);
  const [heroSection, setHeroSection] = useState<any>(null);
  const [targetAudience, setTargetAudience] = useState<any>(null);
  const [thankYouConfig, setThankYouConfig] = useState<any>(null);

  useEffect(() => {
    const loadConfig = async () => {
      const websiteConfigData = await ConfigService.getWebsiteConfig();
      setWebsiteConfig(websiteConfigData);

      const heroSectionData = await ConfigService.getHeroSection();
      setHeroSection(heroSectionData);

      const targetAudienceData = await ConfigService.getTargetAudience();
      setTargetAudience(targetAudienceData);

      const thankYouConfigData = await ConfigService.getThankYouConfig();
      setThankYouConfig(thankYouConfigData);
    };

    loadConfig();
  }, []);

  const handleWebsiteConfigChange = async (e: any) => {
    const { name, value } = e.target;
    setWebsiteConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleHeroSectionChange = async (e: any) => {
    const { name, value } = e.target;
    setHeroSection(prev => ({ ...prev, [name]: value }));
  };

  const handleTargetAudienceChange = async (e: any) => {
    const { name, value } = e.target;
    setTargetAudience(prev => ({ ...prev, [name]: value }));
  };

  const handleThankYouConfigChange = async (e: any) => {
    const { name, value } = e.target;
    setThankYouConfig(prev => ({ ...prev, [name]: value }));
  };

  const updateWebsiteConfig = async () => {
    if (websiteConfig) {
      await ConfigService.updateWebsiteConfig(websiteConfig);
      alert('Website config updated!');
    }
  };

  const updateHeroSection = async () => {
    if (heroSection) {
      await ConfigService.updateHeroSection(heroSection);
      alert('Hero section updated!');
    }
  };

  const updateTargetAudience = async () => {
    if (targetAudience) {
      await ConfigService.updateTargetAudience(targetAudience);
      alert('Target audience updated!');
    }
  };

  const updateThankYouConfig = async () => {
    if (thankYouConfig) {
      await ConfigService.updateThankYouConfig(thankYouConfig);
      alert('Thank you config updated!');
    }
  };

  return (
    <RequireAuth>
      <div>
        <h1>Admin Panel</h1>

        <h2>Website Config</h2>
        {websiteConfig && (
          <div>
            <input type="text" name="title" value={websiteConfig.title} onChange={handleWebsiteConfigChange} />
            <input type="text" name="description" value={websiteConfig.description} onChange={handleWebsiteConfigChange} />
            <button onClick={updateWebsiteConfig}>Update Website Config</button>
          </div>
        )}

        <h2>Hero Section</h2>
        {heroSection && (
          <div>
            <input type="text" name="title" value={heroSection.title} onChange={handleHeroSectionChange} />
            <input type="text" name="subtitle" value={heroSection.subtitle} onChange={handleHeroSectionChange} />
            <button onClick={updateHeroSection}>Update Hero Section</button>
          </div>
        )}

        <h2>Target Audience</h2>
        {targetAudience && (
          <div>
            <input type="text" name="title" value={targetAudience.title} onChange={handleTargetAudienceChange} />
            <input type="text" name="intro_text" value={targetAudience.intro_text} onChange={handleTargetAudienceChange} />
            <button onClick={updateTargetAudience}>Update Target Audience</button>
          </div>
        )}

        <h2>Thank You Config</h2>
        {thankYouConfig && (
          <div>
            <input type="text" name="title" value={thankYouConfig.title} onChange={handleThankYouConfigChange} />
            <input type="text" name="subtitle" value={thankYouConfig.subtitle} onChange={handleThankYouConfigChange} />
            <button onClick={updateThankYouConfig}>Update Thank You Config</button>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
