import {Request, Response} from 'express';
import { extractText } from '../services/parser.service.js';
import { evaluateResume } from '../services/analysis.service.js';
import { matchResumeToJob } from '../services/analysis.service.js';

export const evaluateResumeController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' })
    }

    const { buffer, mimetype, originalname, size } = req.file

    console.log(`[EVALUATE] Extracting text from: ${originalname}`)
    const extractedText = await extractText(buffer, mimetype)

    if (!extractedText || extractedText.length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Could not extract enough text. Make sure the file is not a scanned image.',
      })
    }

    console.log(`[EVALUATE] Sending to Groq...`)
    const evaluation = await evaluateResume(extractedText)

    return res.status(200).json({
      success: true,
      data: {
        file: {
          name: originalname,
          type: mimetype,
          sizeKB: (size / 1024).toFixed(2),
          wordCount: extractedText.split(/\s+/).filter(Boolean).length,
        },
        evaluation,
      },
    })
  } catch (err: any) {
    console.error('[EVALUATE] Error:', err.message)

    if (err.message.includes('JSON')) {
      return res.status(500).json({
        success: false,
        error: 'AI returned unexpected format. Please try again.',
      })
    }

    return res.status(500).json({ success: false, error: err.message })
  }
}

export const matchResumeController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' })
    }

    const jobDescription = req.body.jobDescription?.trim()

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        error: 'jobDescription is required in the request body',
      })
    }

    if (jobDescription.length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Job description is too short. Please provide a detailed job description.',
      })
    }

    const { buffer, mimetype, originalname, size } = req.file

    console.log(`[MATCH] Extracting text from: ${originalname}`)
    const extractedText = await extractText(buffer, mimetype)

    if (!extractedText || extractedText.length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Could not extract enough text. Make sure the file is not a scanned image.',
      })
    }

    console.log(`[MATCH] Sending to Groq for job matching...`)
    const matchResult = await matchResumeToJob(extractedText, jobDescription)

    return res.status(200).json({
      success: true,
      data: {
        file: {
          name: originalname,
          type: mimetype,
          sizeKB: (size / 1024).toFixed(2),
          wordCount: extractedText.split(/\s+/).filter(Boolean).length,
        },
        jobDescriptionLength: jobDescription.length,
        match: matchResult,
      },
    })
  } catch (err: any) {
    console.error('[MATCH] Error:', err.message)

    if (err.message.includes('JSON')) {
      return res.status(500).json({
        success: false,
        error: 'AI returned unexpected format. Please try again.',
      })
    }

    return res.status(500).json({ success: false, error: err.message })
  }
}