require 'csv'

class Importer

  attr_reader     :file_importers,  # File imports are classes that implement two methods:
                                    # remote_file_name => name of the remote file to import
                                    # import_row => method for importing each row
                  :client,
                  :school_scope

  def initialize(options = {})
    @client = options[:client]                    # Required - client for connecting to remote site
    @file_importers = options[:file_importers]    # Required - array of per-file importers
    @school_scope = options[:school_scope]        # Optional array of school local IDs
    @log = options[:log_destination] || STDOUT
  end

  def filter
    @filter ||= SchoolFilter.new(@school_scope)
  end

  def connect_transform_import
    file_importers.each do |file_importer|
      file_name = file_importer.remote_file_name
      file = @client.read_file(file_name)

      pre_cleanup_csv = CSV.parse(file, headers: true)
      data = file_importer.data_transformer.transform(file)
      CleanupReport.new(@log, file_name, pre_cleanup_csv.size, data.size).print

      data.each.each_with_index do |row, index|
        file_importer.import_row(row) if filter.include?(row)
        ProgressBar.new(@log, file_name, data.size, index + 1).print
      end
    end
  end
end
