type Constants = {
  [key: string]: string
}

const constants: Constants = {
  prompt:
    'I will provide you with 5 random words, and I would like you to write me a short tale out of those 5 words. It should be no longer than 100 words, and it should be something clever and nice, suitable for small kids to enjoy before bedtime. ',
  networkErrorTitle: 'Network request error.',
  networkErrorMessage:
    'Something went wrong when trying to generate your tale. Please check your connection and try again.'
}

export default constants
