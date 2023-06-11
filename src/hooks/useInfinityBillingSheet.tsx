import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useLazyGetBillingSheetQuery} from '../store';
import {BillingData} from '../utils';
import useLoadingHandler from './useLoadingHandler';

const useInfinityBillingSheet = () => {
  const shouldReset = useRef(true);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Array<BillingData>>([]);
  const [allData, setAllData] = useState<Array<BillingData>>([]);
  const [loading, setLoading] = useState(false);
  const [trigger, result] = useLazyGetBillingSheetQuery();
  useLoadingHandler({isLoading: result.isLoading});

  useEffect(() => {
    trigger({page: 1});
  }, []);

  useEffect(() => {
    if (!result.isSuccess) return;
    if (shouldReset.current) {
      shouldReset.current = false;
      result.data.data;
      setAllData(result.data.data);
    } else {
      setAllData([...results, ...result.data.data]);
    }
    setLoading(false);
  }, [result.data]);

  useEffect(() => {
    let filter = allData;
    if (search) {
      filter = filter.filter(item => {
        let valTextToLowercase = search.toLowerCase();
        let patientNameToLowercase =
          item.patient_name !== null ? item.patient_name.toLowerCase() : '';
        return patientNameToLowercase.includes(valTextToLowercase);
      });
      setResults(filter);
    } else {
      setResults(allData);
    }
  }, [result.data, search, setResults, allData]);

  const totalPage = useMemo(() => {
    if (result?.data?.meta.last_page) return result?.data?.meta.last_page;
    return 0;
  }, [result?.data?.meta.last_page]);

  const currentPage = useMemo(() => {
    if (result.data?.meta.current_page) return result.data?.meta.current_page;
    return 0;
  }, [result.data?.meta.current_page]);

  const handleScroll = useCallback(
    ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;

      const screenLayout = layoutMeasurement.height + contentOffset.y;
      const verticalHeight = contentSize.height - 200;
      const nextPage = currentPage < totalPage;
      if (screenLayout >= verticalHeight && nextPage) {
        trigger({page: currentPage + 1});
      }
    },
    [currentPage, totalPage],
  );

  return {
    data: results,
    handleScroll,
    search,
    setSearch,
  };
};
export default useInfinityBillingSheet;
