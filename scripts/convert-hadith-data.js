#!/usr/bin/env node

/**
 * Hadith Data Conversion Utility
 * 
 * Converts hadith data from various formats (CSV, XML, etc.) into the required JSON schema
 * for Firebase Firestore import.
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xml2js = require('xml2js');

// Output schema structure
const REQUIRED_FIELDS = [
  'collection',
  'book_number',
  'book_name', 
  'chapter_number',
  'chapter_name',
  'hadith_number',
  'text_arabic',
  'translation_en',
  'chain_of_narrators',
  'reference'
];

const OPTIONAL_FIELDS = [
  'tags',
  'grade',
  'narrator',
  'category'
];

/**
 * Convert CSV data to JSON schema
 */
function convertCsvToJson(csvFilePath, outputPath) {
  const results = [];
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      const hadith = {
        collection: data.collection || 'Sahih al-Bukhari',
        book_number: parseInt(data.book_number) || 1,
        book_name: data.book_name || '',
        chapter_number: parseInt(data.chapter_number) || 1,
        chapter_name: data.chapter_name || '',
        hadith_number: parseInt(data.hadith_number) || 1,
        text_arabic: data.text_arabic || data.arabic_text || '',
        translation_en: data.translation_en || data.english_text || data.translation || '',
        chain_of_narrators: data.chain_of_narrators || data.isnad || data.narrators || '',
        reference: data.reference || `${data.book_number}.${data.chapter_number}.${data.hadith_number}`,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        grade: data.grade || 'Sahih',
        narrator: data.narrator || '',
        category: data.category || ''
      };
      
      results.push(hadith);
    })
    .on('end', () => {
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
      console.log(`✅ Converted ${results.length} hadiths from CSV to JSON`);
      console.log(`📁 Output saved to: ${outputPath}`);
    });
}

/**
 * Convert XML data to JSON schema
 */
function convertXmlToJson(xmlFilePath, outputPath) {
  const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
  const parser = new xml2js.Parser();
  
  parser.parseString(xmlData, (err, result) => {
    if (err) {
      console.error('❌ Error parsing XML:', err);
      return;
    }
    
    const hadiths = [];
    
    // Extract hadiths from XML structure
    // Adjust this based on your XML structure
    const hadithNodes = result.hadiths?.hadith || result.root?.hadith || [];
    
    hadithNodes.forEach((node, index) => {
      const hadith = {
        collection: node.collection?.[0] || 'Sahih al-Bukhari',
        book_number: parseInt(node.book_number?.[0]) || 1,
        book_name: node.book_name?.[0] || '',
        chapter_number: parseInt(node.chapter_number?.[0]) || 1,
        chapter_name: node.chapter_name?.[0] || '',
        hadith_number: parseInt(node.hadith_number?.[0]) || index + 1,
        text_arabic: node.text_arabic?.[0] || node.arabic?.[0] || '',
        translation_en: node.translation_en?.[0] || node.english?.[0] || '',
        chain_of_narrators: node.chain_of_narrators?.[0] || node.isnad?.[0] || '',
        reference: node.reference?.[0] || `${node.book_number?.[0] || 1}.${node.chapter_number?.[0] || 1}.${node.hadith_number?.[0] || index + 1}`,
        tags: node.tags?.[0] ? node.tags[0].split(',').map(tag => tag.trim()) : [],
        grade: node.grade?.[0] || 'Sahih',
        narrator: node.narrator?.[0] || '',
        category: node.category?.[0] || ''
      };
      
      hadiths.push(hadith);
    });
    
    fs.writeFileSync(outputPath, JSON.stringify(hadiths, null, 2));
    console.log(`✅ Converted ${hadiths.length} hadiths from XML to JSON`);
    console.log(`📁 Output saved to: ${outputPath}`);
  });
}

/**
 * Validate JSON data against required schema
 */
function validateJsonData(jsonFilePath) {
  const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  const errors = [];
  
  if (!Array.isArray(data)) {
    errors.push('Data must be an array of hadith objects');
    return errors;
  }
  
  data.forEach((hadith, index) => {
    const missingFields = REQUIRED_FIELDS.filter(field => !hadith[field]);
    
    if (missingFields.length > 0) {
      errors.push(`Hadith at index ${index} missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Validate data types
    if (hadith.book_number && typeof hadith.book_number !== 'number') {
      errors.push(`Hadith at index ${index}: book_number must be a number`);
    }
    
    if (hadith.chapter_number && typeof hadith.chapter_number !== 'number') {
      errors.push(`Hadith at index ${index}: chapter_number must be a number`);
    }
    
    if (hadith.hadith_number && typeof hadith.hadith_number !== 'number') {
      errors.push(`Hadith at index ${index}: hadith_number must be a number`);
    }
    
    if (hadith.tags && !Array.isArray(hadith.tags)) {
      errors.push(`Hadith at index ${index}: tags must be an array`);
    }
  });
  
  return errors;
}

/**
 * Generate sample data for testing
 */
function generateSampleData(outputPath, count = 10) {
  const sampleHadiths = [];
  
  for (let i = 1; i <= count; i++) {
    const hadith = {
      collection: 'Sahih al-Bukhari',
      book_number: Math.floor((i - 1) / 5) + 1,
      book_name: `Book ${Math.floor((i - 1) / 5) + 1}`,
      chapter_number: Math.floor((i - 1) % 5) + 1,
      chapter_name: `Chapter ${Math.floor((i - 1) % 5) + 1}`,
      hadith_number: i,
      text_arabic: `نص عربي للحديث رقم ${i}`,
      translation_en: `This is sample hadith number ${i} in English translation.`,
      chain_of_narrators: `Narrator chain for hadith ${i}`,
      reference: `${Math.floor((i - 1) / 5) + 1}.${Math.floor((i - 1) % 5) + 1}.${i}`,
      tags: ['sample', 'test'],
      grade: 'Sahih',
      narrator: 'Sample Narrator',
      category: 'Sample Category'
    };
    
    sampleHadiths.push(hadith);
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(sampleHadiths, null, 2));
  console.log(`✅ Generated ${count} sample hadiths`);
  console.log(`📁 Output saved to: ${outputPath}`);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log('🔄 Hadith Data Conversion Utility');
  console.log('==================================\n');
  
  switch (command) {
    case 'csv':
      if (args.length < 3) {
        console.log('Usage: node convert-hadith-data.js csv <input.csv> <output.json>');
        process.exit(1);
      }
      convertCsvToJson(args[1], args[2]);
      break;
      
    case 'xml':
      if (args.length < 3) {
        console.log('Usage: node convert-hadith-data.js xml <input.xml> <output.json>');
        process.exit(1);
      }
      convertXmlToJson(args[1], args[2]);
      break;
      
    case 'validate':
      if (args.length < 2) {
        console.log('Usage: node convert-hadith-data.js validate <input.json>');
        process.exit(1);
      }
      const errors = validateJsonData(args[1]);
      if (errors.length === 0) {
        console.log('✅ JSON data is valid');
      } else {
        console.log('❌ Validation errors:');
        errors.forEach(error => console.log(`  - ${error}`));
      }
      break;
      
    case 'sample':
      const outputPath = args[1] || 'data/sample-hadiths.json';
      const count = parseInt(args[2]) || 10;
      generateSampleData(outputPath, count);
      break;
      
    default:
      console.log('Available commands:');
      console.log('  csv <input.csv> <output.json>     - Convert CSV to JSON');
      console.log('  xml <input.xml> <output.json>     - Convert XML to JSON');
      console.log('  validate <input.json>             - Validate JSON data');
      console.log('  sample [output.json] [count]      - Generate sample data');
      console.log('\nExamples:');
      console.log('  node convert-hadith-data.js csv hadiths.csv bukhari.json');
      console.log('  node convert-hadith-data.js validate bukhari.json');
      console.log('  node convert-hadith-data.js sample data/sample.json 20');
      break;
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  convertCsvToJson,
  convertXmlToJson,
  validateJsonData,
  generateSampleData
}; 