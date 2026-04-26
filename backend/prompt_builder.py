def build_prompt(cv_text, job_description):
    # TODO: replaces this with proper prompt engineering
    return f"CV:\n{cv_text}\n\nJob Description:\n{job_description}"


def format_response(raw_response):
    # TODO:  replaces this with proper response formatting
    return {"result": raw_response}
