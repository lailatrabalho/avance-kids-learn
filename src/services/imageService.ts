import { supabase } from '@/integrations/supabase/client';

export class ImageService {
  static async uploadImage(file: File, path: string): Promise<string | null> {
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      // Upload the file
      const { data, error } = await supabase.storage
        .from('website-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading image:', error);
        return null;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      return null;
    }
  }

  static async deleteImage(url: string): Promise<boolean> {
    try {
      // Extract the path from the URL
      const urlParts = url.split('/');
      const path = urlParts.slice(-2).join('/'); // Get the last two parts (folder/filename)

      const { error } = await supabase.storage
        .from('website-images')
        .remove([path]);

      if (error) {
        console.error('Error deleting image:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteImage:', error);
      return false;
    }
  }

  static getImageUrl(path: string): string {
    const { data: { publicUrl } } = supabase.storage
      .from('website-images')
      .getPublicUrl(path);
    
    return publicUrl;
  }
}