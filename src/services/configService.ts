import { supabase } from '@/integrations/supabase/client';

export interface WebsiteConfig {
  id: string;
  title: string;
  description: string;
  whatsapp_number: string;
  purchase_link: string;
  created_at: string;
  updated_at: string;
}

export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  description_1: string;
  description_2: string;
  description_3: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image_url: string | null;
  initials: string;
  rating: number;
  category: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  intro_text: string;
  cta_text: string;
  cta_subtext: string;
  card_1_title: string;
  card_1_description: string;
  card_1_detail: string;
  card_2_title: string;
  card_2_description: string;
  card_2_detail: string;
  card_3_title: string;
  card_3_description: string;
  card_3_detail: string;
  card_4_title: string;
  card_4_description: string;
  card_4_detail: string;
  created_at: string;
  updated_at: string;
}

export interface ThankYouConfig {
  id: string;
  title: string;
  subtitle: string;
  instructions: string;
  support_text: string;
  created_at: string;
  updated_at: string;
}

export class ConfigService {
  static async getWebsiteConfig(): Promise<WebsiteConfig | null> {
    const { data, error } = await supabase
      .from('website_config')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching website config:', error);
      return null;
    }
    
    return data;
  }

  static async getHeroSection(): Promise<HeroSection | null> {
    const { data, error } = await supabase
      .from('hero_section')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching hero section:', error);
      return null;
    }
    
    return data;
  }

  static async getBenefits(): Promise<Benefit[]> {
    const { data, error } = await supabase
      .from('benefits')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching benefits:', error);
      return [];
    }
    
    return data || [];
  }

  static async getPackages(): Promise<Package[]> {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching packages:', error);
      return [];
    }
    
    return data || [];
  }

  static async getTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
    
    return data || [];
  }

  static async getTargetAudience(): Promise<TargetAudience | null> {
    const { data, error } = await supabase
      .from('target_audience')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching target audience:', error);
      return null;
    }
    
    return data;
  }

  static async getThankYouConfig(): Promise<ThankYouConfig | null> {
    const { data, error } = await supabase
      .from('thank_you_config')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching thank you config:', error);
      return null;
    }
    
    return data;
  }

  // Update methods
  static async updateWebsiteConfig(updates: Partial<WebsiteConfig>): Promise<boolean> {
    const { error } = await supabase
      .from('website_config')
      .update(updates)
      .eq('id', updates.id);
    
    if (error) {
      console.error('Error updating website config:', error);
      return false;
    }
    
    return true;
  }

  static async updateHeroSection(updates: Partial<HeroSection>): Promise<boolean> {
    const { error } = await supabase
      .from('hero_section')
      .update(updates)
      .eq('id', updates.id);
    
    if (error) {
      console.error('Error updating hero section:', error);
      return false;
    }
    
    return true;
  }

  static async updateBenefit(id: string, updates: Partial<Benefit>): Promise<boolean> {
    const { error } = await supabase
      .from('benefits')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating benefit:', error);
      return false;
    }
    
    return true;
  }

  static async updatePackage(id: string, updates: Partial<Package>): Promise<boolean> {
    const { error } = await supabase
      .from('packages')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating package:', error);
      return false;
    }
    
    return true;
  }

  static async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<boolean> {
    const { error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating testimonial:', error);
      return false;
    }
    
    return true;
  }

  static async updateTargetAudience(updates: Partial<TargetAudience>): Promise<boolean> {
    const { error } = await supabase
      .from('target_audience')
      .update(updates)
      .eq('id', updates.id);
    
    if (error) {
      console.error('Error updating target audience:', error);
      return false;
    }
    
    return true;
  }

  static async updateThankYouConfig(updates: Partial<ThankYouConfig>): Promise<boolean> {
    const { error } = await supabase
      .from('thank_you_config')
      .update(updates)
      .eq('id', updates.id);
    
    if (error) {
      console.error('Error updating thank you config:', error);
      return false;
    }
    
    return true;
  }
}