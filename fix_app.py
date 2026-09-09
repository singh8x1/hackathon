import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace all back to original
content = content.replace("currentUser={currentUser}\n        currentTeam={currentTeam}", "currentUser={currentUser}")
# And the one with />
content = content.replace("currentUser={currentUser}\n        currentTeam={currentTeam} />", "currentUser={currentUser} />")

# specifically target SubmissionFormModal
# The SubmissionFormModal component starts with `<SubmissionFormModal` and ends with `/>`
# We can use regex to find `<SubmissionFormModal[^>]+currentUser=\{currentUser\}[^>]*/>`
# Actually, the file is formatted. Let's just do it directly.
replacement = """      <SubmissionFormModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleNewSubmission}
        preSelectedDatasetId={preSelectedDatasetId}
        currentUser={currentUser}
        currentTeam={currentTeam}
      />"""

content = re.sub(
    r"<SubmissionFormModal\s+isOpen=\{isSubmitModalOpen\}\s+onClose=\{\(\) => setIsSubmitModalOpen\(false\)\}\s+onSubmitSuccess=\{handleNewSubmission\}\s+preSelectedDatasetId=\{preSelectedDatasetId\}\s+currentUser=\{currentUser\}\s+/>",
    replacement,
    content
)

with open("src/App.tsx", "w") as f:
    f.write(content)
